const WrappingComp = ({ loading, list=[], emptyMsg, children }) => {
  if (loading)
    return (
      <div className="py-2 px-5 w-full flex items-center justify-center min-h-[150px]">
        <span className="loader"></span>
      </div>
    );
  else {
    if (list?.length > 0) return children;
    else
      return (
        <div className="flex items-center justify-center min-h-[150px] text-sm">
          <p>{emptyMsg}</p>
        </div>
      );
  }
};

export default WrappingComp;
