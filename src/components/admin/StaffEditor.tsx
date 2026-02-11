"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type StaffMember = {
  id: string;
  name: string;
  order: number;
};

type StaffRole = {
  id: string;
  key: string;
  name: string;
  order: number;
  members: StaffMember[];
};

type RoleState = {
  id: string;
  key: string;
  name: string;
  order: number;
  members: StaffMember[];
};

export default function StaffEditor({ roles }: { roles: StaffRole[] }) {
  const router = useRouter();
  const [roleState, setRoleState] = useState<RoleState[]>(roles);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    roleId: string;
    index: number;
    name: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const sortedRoles = useMemo(
    () => [...roleState].sort((a, b) => a.order - b.order),
    [roleState],
  );

  const updateRoleState = (
    roleId: string,
    updater: (role: RoleState) => RoleState,
  ) => {
    setRoleState((prev) =>
      prev.map((role) => (role.id === roleId ? updater(role) : role)),
    );
  };

  const handleAddTeacher = (roleId: string) => {
    updateRoleState(roleId, (role) => ({
      ...role,
      members: [
        ...role.members,
        {
          id: "",
          name: "",
          order: role.members.length,
        },
      ],
    }));
  };

  const handleRemoveClick = (roleId: string, index: number) => {
    const role = roleState.find((r) => r.id === roleId);
    const member = role?.members[index];

    // If member is new (not saved yet), remove directly without confirmation
    if (!member?.id) {
      updateRoleState(roleId, (r) => ({
        ...r,
        members: r.members.filter((_, i) => i !== index),
      }));
      return;
    }

    setDeleteTarget({
      roleId,
      index,
      name: member.name || "zaměstnance",
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    const role = roleState.find((r) => r.id === deleteTarget.roleId);
    const member = role?.members[deleteTarget.index];

    if (member?.id) {
      try {
        const response = await fetch(`/api/admin/staff/members/${member.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          setSnackbar({
            open: true,
            message: "Smazání zaměstnance selhalo",
            severity: "error",
          });
          setDeleting(false);
          setDeleteTarget(null);
          return;
        }
      } catch {
        setSnackbar({
          open: true,
          message: "Smazání zaměstnance selhalo",
          severity: "error",
        });
        setDeleting(false);
        setDeleteTarget(null);
        return;
      }
    }

    // Remove from local state
    updateRoleState(deleteTarget.roleId, (r) => ({
      ...r,
      members: r.members.filter((_, i) => i !== deleteTarget.index),
    }));

    setSnackbar({
      open: true,
      message: `${deleteTarget.name} byl/a úspěšně odebrán/a`,
      severity: "success",
    });
    setDeleting(false);
    setDeleteTarget(null);
    router.refresh();
  };

  const handleSaveRole = async (role: RoleState) => {
    setSavingId(role.id);
    setError("");

    try {
      const roleName = role.name.trim();
      if (!roleName) {
        throw new Error("Název role je povinný");
      }

      const roleResponse = await fetch(`/api/admin/staff/roles/${role.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: roleName }),
      });

      if (!roleResponse.ok) {
        const payload = await roleResponse.json().catch(() => null);
        throw new Error(payload?.error || "Uložení role selhalo");
      }

      const updatedMembers: StaffMember[] = [];
      for (let index = 0; index < role.members.length; index += 1) {
        const member = role.members[index];
        const name = member.name.trim();

        if (!name) {
          if (member.id) {
            await fetch(`/api/admin/staff/members/${member.id}`, {
              method: "DELETE",
            });
          }
          continue;
        }

        if (member.id) {
          const response = await fetch(
            `/api/admin/staff/members/${member.id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, order: index }),
            },
          );
          if (!response.ok) {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.error || "Uložení člena selhalo");
          }
          updatedMembers.push({ ...member, name, order: index });
        } else {
          const response = await fetch("/api/admin/staff/members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roleId: role.id, name, order: index }),
          });
          if (!response.ok) {
            const payload = await response.json().catch(() => null);
            throw new Error(payload?.error || "Uložení člena selhalo");
          }
          const payload = await response.json().catch(() => null);
          updatedMembers.push({
            ...member,
            id: payload?.id ?? member.id,
            name,
            order: index,
          });
        }
      }

      updateRoleState(role.id, (prevRole) => ({
        ...prevRole,
        name: roleName,
        members: updatedMembers,
      }));

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Uložení selhalo");
    } finally {
      setSavingId(null);
    }
  };

  const renderSingleMember = (role: RoleState) => {
    const member = role.members[0] || { id: "", name: "", order: 0 };

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
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {sortedRoles.map((role) => (
        <Paper key={role.id} sx={{ p: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">{role.name}</Typography>
            <Button
              variant="contained"
              onClick={() => handleSaveRole(role)}
              disabled={savingId === role.id}
            >
              {savingId === role.id ? "Ukládám..." : "Uložit"}
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

            {role.key === "teachers" ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {role.name}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => handleAddTeacher(role.id)}
                  >
                    Přidat
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {role.members.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      Zatím nejsou přidány žádné osoby.
                    </Typography>
                  ) : (
                    role.members.map((member, index) => (
                      <Box
                        key={`${member.id || index}`}
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <TextField
                          label={`Učitelka ${index + 1}`}
                          value={member.name}
                          onChange={(event) =>
                            updateRoleState(role.id, (prevRole) => ({
                              ...prevRole,
                              members: prevRole.members.map(
                                (item, itemIndex) =>
                                  itemIndex === index
                                    ? { ...item, name: event.target.value }
                                    : item,
                              ),
                            }))
                          }
                          fullWidth
                        />
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveClick(role.id, index)}
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

      {/* Potvrzovací dialog pro smazání */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
      >
        <DialogTitle>Smazat zaměstnance?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Opravdu chcete odebrat{" "}
            <strong>{deleteTarget?.name}</strong>? Tuto akci nelze vrátit
            zpět.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
          >
            Zrušit
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Mažu..." : "Smazat"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Oznámení o výsledku */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
