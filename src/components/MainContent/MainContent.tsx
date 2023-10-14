const MainContent = ({
  expand,
  children,
}: {
  expand: boolean;
  children: React.ReactNode;
}) => {
  return (
    <main
      className={`pt-16 px-4 transition-all duration-300 ${
        expand ? `open-side_menu` : ""
      }`}
    >
      {children}
    </main>
  );
};

export default MainContent;
