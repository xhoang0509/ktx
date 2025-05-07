export type ReceivedProps = Record<string, any>;

const useHomeInvoices = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useHomeInvoices>;

export default useHomeInvoices;
