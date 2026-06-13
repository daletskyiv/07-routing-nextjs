type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};
export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
}
