export const ErrorPage = ({ message } : {message: string}) => {
  return (
    <div className="container">
      <h2> {message} </h2>
    </div>
  );
}
