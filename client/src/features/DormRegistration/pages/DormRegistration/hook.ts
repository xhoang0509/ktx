export type ReceivedProps = Record<string, any>;

const useDormRegistration = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useDormRegistration>;

export default useDormRegistration;
