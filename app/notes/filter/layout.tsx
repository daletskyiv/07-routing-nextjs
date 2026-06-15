type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
};
export default function NotesLayout({
  children,
  sidebar,
  modal,
}: NotesLayoutProps) {
  return (
    <section>
      <aside>{sidebar}</aside>
      <div>{children}</div>
      {modal}
    </section>
  );
}
