export type ReceivedProps = Record<string, any>;

const useHomeNotification = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useHomeNotification>;

export default useHomeNotification;
