'use client'

import Link from 'next/link'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

type LinkIconButtonProps = IconButtonProps & {
  href: string
}

export default function LinkIconButton({ href, ...props }: LinkIconButtonProps) {
  return <IconButton component={Link} href={href} {...props} />
}

