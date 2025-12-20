// Container da página
export const ContainerPagina = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6 p-5">{children}</div>;
};

// Título de seção
export const TituloSecao = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h3 className="text-xs font-bold uppercase">{children}</h3>;
};

// Conteúdo da seção
export const ConteudoSecao = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="space-y-3">{children}</div>;
};

// Rolagem horizontal da seção
export const RolagemSecao = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
};
