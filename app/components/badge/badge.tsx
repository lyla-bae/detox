"use client";

export default function Badge({
  variant,
  children,
}: {
  variant: string;
  children: React.ReactNode;
}) {
  return (
    // <span className="badge badge-primary">D-24</span>
    // <span className="badge badge-danger">내일결제</span>
    <span className={`badge badge-${variant}`}>{children}</span>
  );
}
