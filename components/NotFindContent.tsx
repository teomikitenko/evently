export const NotFindContent = ({title,message}:{title:string,message:string}) => {
    return (
      <div className="py-6 px-10">
        <div className="dotted-bg flex justify-center py-12">
          <div>
            <h3 className="text-2xl font-bold leading-[3rem]">
              {title}
            </h3>
            <p className="text-center text-sm">{message}</p>
          </div>
        </div>
      </div>
    );
  };