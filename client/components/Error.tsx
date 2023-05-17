import React from "react";

interface ErrorMsg {
  message: string;
  field?: string;
}

interface Props {
  errors: ErrorMsg[];
}

export const getErrorsComponent = (data: any) => {
  const errors = data.response.data as ErrorMsg[];
  if (!errors) {
    return (
      <div className="alert alert-danger">
        <h4>Unspected error</h4>
      </div>
    );
  }

  console.log('ERROR', errors)

  return <Error errors={errors} />;
};

export default function Error(props: Props) {
  return (
    <div className="alert alert-danger">
      <h4>Ops....</h4>
      <ul>
        {props.errors.map((e) => (
          <li key={e.message}>{e.message}</li>
        ))}
      </ul>
    </div>
  );
}
