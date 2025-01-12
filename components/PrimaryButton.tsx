"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  link?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  className = "",
  link,
}) => (
  <Link href={`/${link}`} className={`${className}`} onClick={onClick}>
    {children}
  </Link>
);
