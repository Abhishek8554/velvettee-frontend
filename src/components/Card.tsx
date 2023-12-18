type CardProps = {
  heading: string;
  subHeading: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ heading, subHeading, children }) => {
  return (
    <div className="z-10 max-w-sm m-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="border-default">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
          {heading}
        </h5>
      </div>

      <p className="mb-1 mt-6 text-sm font-medium">{subHeading}</p>

      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
