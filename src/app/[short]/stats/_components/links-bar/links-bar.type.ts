export type LinksBarItem = {
  icon: React.ReactElement;
  title: string;
  path: string;
};

export type LinksBarProps = {
  items: LinksBarItem[];
};