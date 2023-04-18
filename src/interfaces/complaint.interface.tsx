export type TComplaints = {
  _id: string;
  subject: string;
  details: string;
  images: string[];
  sender: {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
  category?: string;
  receiver?: string;
  reassigned_to?: string;
  university: string;
  priority: string;
  status: string;
  anonymity: boolean;
  createdAt: string;
  updatedAt: string;
};
