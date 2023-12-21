import React, { useEffect } from "react";

import { columns, Classroom } from "../classroommanage/column";
import { DataTable } from "@/components/ui/data-table";

async function getClassroom(): Promise<Classroom[]> {
  const res = await fetch(
    "https://6577fda6197926adf62f397c.mockapi.io/account"
  );
  const data = await res.json();
  return data;
}

export default async function Classroom() {
  const data = await getClassroom();
  return (
    <section className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold">All Classroom</h1>

        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
