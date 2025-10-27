import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types";
import TableActions from "./TableActions";
import { BadgeCheckIcon, XCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { roles_name } from "@/constants";

const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "full_name",
    header: () => <span>To&apos;liq ism</span>,
  },
  {
    accessorKey: "phone_number",
    header: () => <span>Telefon raqami</span>,
  },
  {
    accessorKey: "role",
    header: () => <span>Rol</span>,
    cell: ({ row }) => {
      return <span>{roles_name[row.original.role]}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => <span>Holati</span>,
    cell: ({ row }) => {
      const status = row.original.status;

      return status === "active" ? (
        <Badge
          variant="secondary"
          className="bg-green-500 text-white dark:bg-green-600"
        >
          <BadgeCheckIcon />
          Faol
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          className="bg-red-500 text-white dark:bg-red-600"
        >
          <XCircleIcon className="mr-1 h-4 w-4" />
          Nofaol
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <span>Harakatlar</span>,
    cell: (info) => <TableActions userInfo={info.row.original} />,
  },
];

export default columns;
