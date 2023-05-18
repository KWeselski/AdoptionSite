import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import { adoptionApplications } from "../../mocks";

const TableData = ({ label, value }) => (
  <div key={label} className="flex w-full py-2 border-b text-start items-start">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{value}</div>
  </div>
);

const AplicationReviewPage = ({ id, onClose }) => {
  const data = adoptionApplications[0];
  return (
    <Dialog title={"Application Review"} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-[42px] text-green-700 text-center p-2 font-bold">
          {data.dogName}
        </h2>
        <img
          src={data.dogImage}
          alt={data.dogName}
          className="w-full h-[400px] object-contain mb-6 rounded"
        />
        <div className="flex flex-col items-start">
          <TableData
            label="Name"
            value={
              data.personalInformation.firstName +
              " " +
              data.personalInformation.lastName
            }
          />
          <TableData
            label="City"
            value={data.personalInformation.address.city}
          />
          <TableData
            label="Street"
            value={data.personalInformation.address.street}
          />
          <TableData
            label="Phone"
            value={data.personalInformation.phoneNumber}
          />
          <TableData label="Email" value={data.personalInformation.email} />
          <TableData label="Home type" value={data.homeInformation.type} />
          <TableData label="Childrens" value={data.homeInformation.children} />
          <TableData
            label="Other pets"
            value={data.homeInformation.otherPets}
          />
        </div>
        <div className="flex flex-row items-center justify-around w-full mt-4">
          <Button variant="primary">Reject</Button>
          <Button variant="primary">Accept</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AplicationReviewPage;
