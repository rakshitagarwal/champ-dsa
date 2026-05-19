/** Lock solve workspace to viewport height; panels scroll internally. */
export default function PracticeQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100dvh-3.5rem)] max-h-[calc(100dvh-3.5rem)] min-h-0 flex-col overflow-hidden">
      {children}
    </div>
  );
}
