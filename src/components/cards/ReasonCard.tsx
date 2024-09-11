interface Reason {
  imageUrl: string;
  title: string;
  description: string;
}

interface ReasonCardProps {
  reason: Reason;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ reason }) => {
  return (
    <div className="w-full flex flex-row lg:flex-col gap-7 bg-white">
      <div className="basis-1/2">
        <img src={reason.imageUrl} alt={reason.title} className="object-cover rounded-md w-full h-32 lg:h-auto" />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <h2 className="text-2xl font-semibold text-dark">{reason.title}</h2>
        <p className="text-gray-500 text-lg">{reason.description}</p>
      </div>
    </div>
  );
};

export default ReasonCard;
