'use client'

import Link from 'next/link'
import Button, { ButtonProps } from '@mui/material/Button'

type LinkButtonProps = ButtonProps & {
  href: string
}

export default function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button component={Link} href={href} {...props} />
}

