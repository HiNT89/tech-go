type NavBoxTextProps = {
  icon: React.ReactNode;
  content: string;
};
const NavBoxText = ({ content, icon }: NavBoxTextProps) => {
  return (
    <div className="flex gap-4 items-center ml-4 font-light">
      {icon}
      <span className="capitalize">{content}</span>
    </div>
  );
};

export default NavBoxText;
