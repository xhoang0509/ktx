export type ReceivedProps = Record<string, any>;

const useBanner = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useBanner>;

export default useBanner;
