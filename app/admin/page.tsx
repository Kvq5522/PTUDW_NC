import React, { useEffect } from "react";

import ClassCard from "@/components/Card/ClassCard";

import { AXIOS } from "@/constants/ApiCall";

import { cn } from "@/lib/utils";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { setUserInfo } from "@/redux/slices/user-info-slice";
import { setClasslist } from "@/redux/slices/classroom-info-slice";

import Loader from "@/components/Loader/Loader";
import EmptyState from "@/components/EmptyState";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ClassroomMenu from "@/components/DropDownMenu/ClassroomMenu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Account, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";

async function getAccount(): Promise<Account[]> {
  const res = await fetch(
    "https://6577fda6197926adf62f397c.mockapi.io/account"
  );
  const data = await res.json();
  return data;
}

export default async function Admin() {
  const data = await getAccount();
  return (
    <section className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold">All Acounts</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
