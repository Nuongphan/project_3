import React from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <Card className="w-2/5 dasboard p-4 shadow-xl shadow-blue-gray-900/5 ">
      <div className="w-1/6 mb-2 p-4 logo">
        <img
          className="logo-img"
          src="https://firebasestorage.googleapis.com/v0/b/fir-upload-2724e.appspot.com/o/277859766_1309543966240516_8474441053295265324_n.webp?alt=media&token=75403cfb-c07f-44cd-b7e2-4ec6d177629a"
          alt=""
        />
      </div>
      <p style={{ margin: "0 0 20px 40px" }}> Nương Nương</p>
      <List>
        <NavLink to="/admin" style={{ borderRadius: "5px" }}>
          <ListItem
            className=" border-b-0 p-3 custom-hover"
            selected={open === 1}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className=" mr-auto font-normal">
              Dashboard
            </Typography>
          </ListItem>
        </NavLink>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0 custom-hover" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                ECommerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0" style={{ color: "#fff", fontSize: "15px" }}>
              <ListItem className=" custom-hover">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/managerorder">Orders</Link>
              </ListItem>{" "}
              <NavLink
                to="/admin/managerproduct"
                style={{ borderRadius: "5px" }}
              >
                <ListItem className=" custom-hover">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem className=" custom-hover">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/manageruser">Customers</Link>
          <ListItemSuffix>
            <Chip
              value={0}
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className=" custom-hover">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Discounts
        </ListItem>
        <ListItem className=" custom-hover">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Feedbacks
        </ListItem>
        <ListItem className=" custom-hover ">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
export default Sidebar;
