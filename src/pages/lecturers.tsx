import React, { useEffect, useState } from "react";
import AssignmentForm from "../components/AssignmentForm";
import PagesLayout from "../layouts/PagesLayout";
import useUserStore from "../store/user-store";
import { useParams } from "react-router-dom";
import assignmentService from "../apis/assignment.service";
 import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Calendar } from "lucide-react";
import AssignmentAnswerForm from "../components/AssignmentAnswersForm";
import userService from "../apis/user.service";
import { Button } from "../components/ui/button";
import * as XLSX from 'xlsx'


export default function Lecturers() {
  const { userData } = useUserStore();
  const [allUsers, setAllUsers] = useState(null);
 
  useEffect(() => {
    async function fetchAssignment() {
      const res = await userService.getAllUsers();
      if (res) {
        setAllUsers(res);
      }
    }
    if (userData ) {
      fetchAssignment();
    }
  }, [userData,]);

  if (!userData) {
    return (
      <PagesLayout>
        <main className="container mx-auto py-10 text-center">
          <p>Please login to access this page</p>
        </main>
      </PagesLayout>
    );
  }

  console.log("allUsers", allUsers);
const handleDownload = () => {
 const jsonData = allUsers.map(data => ({
  lecturerName: data?.username,
  lecturerId: data?._id,
  createdAt: data?.createdAt,

 }))
 
  const worksheet = XLSX.utils.json_to_sheet(jsonData)
 // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lecturers');

    // Generate and trigger download
    XLSX.writeFile(workbook, 'lecturers_list.xlsx');


}
  return (
    <PagesLayout>
      <main className="container mx-auto py-6 ">
        {/* answers */}
       
       <Table>
   <TableHeader>
    <TableRow>
       <TableHead>Lecturer Id</TableHead>
       <TableHead>Lecturer Name</TableHead>
       <TableHead>Date Created</TableHead>
     </TableRow>
  </TableHeader>
  <TableBody>
    {allUsers && allUsers.length > 0 && allUsers?.filter(user => user.role === "LECTURER").map(result => (
    <TableRow key={result?._id}>
      <TableCell>{result?._id}</TableCell>
          <TableCell>{result?.username}</TableCell>
      <TableCell>{result?.createdAt}</TableCell>
     </TableRow>
    ))}
    
  </TableBody>
    
</Table>
<br />
<div className="w-full flex items-center justify-center">
          <Button className="bg-blue-500"
           onClick={handleDownload}>Download</Button>
        </div>
      </main>
    </PagesLayout>
  );
}
