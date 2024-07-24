import {
  GiCctvCamera,
  GiDesert,
  GiIsland,
  GiMountainRoad,
  GiToaster,
  GiWorld,
} from "react-icons/gi"
import {
  FaAirFreshener,
  FaBath,
  FaCity,
  FaFireExtinguisher,
  FaHouseUser,
  FaParking,
  FaUmbrellaBeach,
} from "react-icons/fa"
import { FaKitchenSet, FaPeopleRoof } from "react-icons/fa6"
import { BiSolidFridge, BiWifi } from "react-icons/bi"

import {
  MdMicrowave,
  MdNoMeetingRoom,
  MdOutlinePool,
  MdPets,
  MdYard,
} from "react-icons/md"
import { PiTelevisionFill } from "react-icons/pi"

export const categories = [
  {
    label: "All",
    icon: <GiWorld />,
  },
  {
    img: "https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?auto=compress&cs=tinysrgb&w=600",
    label: "coastal",
    icon: <FaUmbrellaBeach />,
    description: "This property is conveniently located by the beach",
  },
  {
    img: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400",
    label: "Iconic cities",
    icon: <FaCity />,
    description: "This property is located in city!",
  },
  {
    img: "https://images.pexels.com/photos/261105/pexels-photo-261105.jpeg?auto=compress&cs=tinysrgb&w=400",
    label: " Pools",
    icon: <MdOutlinePool />,
    description: "This is property contain a beautiful pool!",
  },
  {
    img: "https://images.pexels.com/photos/188029/pexels-photo-188029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is located on an island!",
  },
  {
    img: "https://images.pexels.com/photos/8968660/pexels-photo-8968660.jpeg?auto=compress&cs=tinysrgb&w=400",
    label: "Mountains",
    icon: <GiMountainRoad />,
    description: "This property is located near the mountain!",
  },
  {
    img: "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=400",
    label: "Desert",
    icon: <GiDesert />,
    description: "This property is in the desert!",
  },
]

export const types = [
  {
    name: "Whole Property",
    description:
      "Enjoy exclusive access to the entire property during your stay.",
    icon: <FaHouseUser />,
  },
  {
    name: "Private Room",
    description:
      "Stay in your own private room with access to shared living spaces.",
    icon: <MdNoMeetingRoom />,
  },
  {
    name: "Shared Space",
    description:
      "Sleep in a common area or shared room, potentially with other guests or hosts.",
    icon: <FaPeopleRoof />,
  },
]

export const facilities = [
  {
    name: "Bath",
    icon: <FaBath />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Air Conditioning",
    icon: <FaAirFreshener />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Parking",
    icon: <FaParking />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets />,
  },
]
