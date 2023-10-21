export type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export type SearchContainerProps = {
  query: string;
  closeSearchModal: () => void;
};
