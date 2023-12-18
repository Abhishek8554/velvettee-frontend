type CardProps = {
  heading: string;
  subHeading: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ heading, subHeading, children }) => {
  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="border-default">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
          {heading}
        </h5>
      </div>

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {subHeading}
      </p>

      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
