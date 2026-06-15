type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};
export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
}
