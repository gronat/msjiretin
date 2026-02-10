'use client'

import { useMemo, useState } from 'react'
import { Box, Typography, TextField, Button, Paper, IconButton, Divider } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

type StaffMember = {
  id: string
  name: string
  order: number
}

type StaffRole = {
  id: string
  key: string
  name: string
  order: number
  members: StaffMember[]
}

type RoleState = {
  id: string
  key: string
  name: string
  order: number
  members: StaffMember[]
}

export default function StaffEditor({ roles }: { roles: StaffRole[] }) {
  const router = useRouter()
  const [roleState, setRoleState] = useState<RoleState[]>(roles)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const sortedRoles = useMemo(
    () => [...roleState].sort((a, b) => a.order - b.order),
    [roleState]
  )

  const updateRoleState = (roleId: string, updater: (role: RoleState) => RoleState) => {
    setRoleState((prev) => prev.map((role) => (role.id === roleId ? updater(role) : role)))
  }

  const handleAddTeacher = (roleId: string) => {
    updateRoleState(roleId, (role) => ({
      ...role,
      members: [
        ...role.members,
        {
          id: '',
          name: '',
          order: role.members.length,
        },
      ],
    }))
  }

  const handleRemoveMember = (roleId: string, index: number) => {
    updateRoleState(roleId, (role) => ({
      ...role,
      members: role.members.filter((_, i) => i !== index),
    }))
  }

  const handleSaveRole = async (role: RoleState) => {
    setSavingId(role.id)
    setError('')

    try {
      const roleName = role.name.trim()
      if (!roleName) {
        throw new Error('Název role je povinný')
      }

      const roleResponse = await fetch(`/api/admin/staff/roles/${role.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roleName }),
      })

      if (!roleResponse.ok) {
        const payload = await roleResponse.json().catch(() => null)
        throw new Error(payload?.error || 'Uložení role selhalo')
      }

      const updatedMembers: StaffMember[] = []
      for (let index = 0; index < role.members.length; index += 1) {
        const member = role.members[index]
        const name = member.name.trim()

        if (!name) {
          if (member.id) {
            await fetch(`/api/admin/staff/members/${member.id}`, {
              method: 'DELETE',
            })
          }
          continue
        }

        if (member.id) {
          const response = await fetch(`/api/admin/staff/members/${member.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, order: index }),
          })
          if (!response.ok) {
            const payload = await response.json().catch(() => null)
            throw new Error(payload?.error || 'Uložení člena selhalo')
          }
          updatedMembers.push({ ...member, name, order: index })
        } else {
          const response = await fetch('/api/admin/staff/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roleId: role.id, name, order: index }),
          })
          if (!response.ok) {
            const payload = await response.json().catch(() => null)
            throw new Error(payload?.error || 'Uložení člena selhalo')
          }
          const payload = await response.json().catch(() => null)
          updatedMembers.push({
            ...member,
            id: payload?.id ?? member.id,
            name,
            order: index,
          })
        }
      }

      updateRoleState(role.id, (prevRole) => ({
        ...prevRole,
        name: roleName,
        members: updatedMembers,
      }))

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Uložení selhalo')
    } finally {
      setSavingId(null)
    }
  }

  const renderSingleMember = (role: RoleState) => {
    const member = role.members[0] || { id: '', name: '', order: 0 }

    return (
      <TextField
        label="Jméno"
        value={member.name}
        onChange={(event) =>
          updateRoleState(role.id, (prevRole) => ({
            ...prevRole,
            members: [{ ...member, name: event.target.value }],
          }))
        }
      />
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {sortedRoles.map((role) => (
        <Paper key={role.id} sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{role.name}</Typography>
            <Button
              variant="contained"
              onClick={() => handleSaveRole(role)}
              disabled={savingId === role.id}
            >
              {savingId === role.id ? 'Ukládám...' : 'Uložit'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Název role"
              value={role.name}
              onChange={(event) =>
                updateRoleState(role.id, (prevRole) => ({
                  ...prevRole,
                  name: event.target.value,
                }))
              }
            />

            {role.key === 'teachers' ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {role.name}
                  </Typography>
                  <Button size="small" startIcon={<Add />} onClick={() => handleAddTeacher(role.id)}>
                    Přidat
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {role.members.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      Zatím nejsou přidány žádné osoby.
                    </Typography>
                  ) : (
                    role.members.map((member, index) => (
                      <Box key={`${member.id || index}`} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                          label={`Učitelka ${index + 1}`}
                          value={member.name}
                          onChange={(event) =>
                            updateRoleState(role.id, (prevRole) => ({
                              ...prevRole,
                              members: prevRole.members.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, name: event.target.value } : item
                              ),
                            }))
                          }
                          fullWidth
                        />
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveMember(role.id, index)}
                          aria-label="Odebrat"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            ) : (
              renderSingleMember(role)
            )}
          </Box>
        </Paper>
      ))}

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  )
}
