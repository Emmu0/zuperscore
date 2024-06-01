type ChildDataProps = {
  created_at: string;
  data: any;
  description: string;
  is_active: boolean;
  kind: string;
  props: any;
  title?: string | undefined;
  updated_at: string;
  visible: boolean;
  children?: ChildDataProps[];
};

export type ResourcesDataProps = {
  children?: ChildDataProps[];
  data?: ChildDataProps | null | undefined;
  id: number | null | undefined;
};
