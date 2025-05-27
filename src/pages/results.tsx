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


export default function Results() {
  const { userData } = useUserStore();
  const [assignment, setAssignment] = useState(null);
  const { assignmentId } = useParams(); // Get dynamic param

  useEffect(() => {
    async function fetchAssignment() {
      const res = await userService.getUsersResult(assignmentId);
      if (res) {
        setAssignment(res);
      }
    }
    if (userData && assignmentId) {
      fetchAssignment();
    }
  }, [userData, assignmentId]);

  if (!userData) {
    return (
      <PagesLayout>
        <main className="container mx-auto py-10 text-center">
          <p>Please login to access this page</p>
        </main>
      </PagesLayout>
    );
  }

  console.log("assignment", assignment);
const handleDownload = () => {
 const jsonData = assignment.map(data => ({
  studentName: data?.studentId?.username,
  studentId: data?.studentId?._id,
  Score: data?.score,

 }))
 
  const worksheet = XLSX.utils.json_to_sheet(jsonData)
 // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate and trigger download
    XLSX.writeFile(workbook, 'students_results.xlsx');


}
  return (
    <PagesLayout>
      <main className="container mx-auto py-6 ">
        {/* answers */}
       
       <Table>
   <TableHeader>
    <TableRow>
      <TableHead>Student Id</TableHead>
      <TableHead>Student Name</TableHead>
      <TableHead>Marks</TableHead>
     </TableRow>
  </TableHeader>
  <TableBody>
    {assignment && assignment.length > 0 && assignment?.map(result => (
    <TableRow key={result?._id}>
      <TableCell>{result?.studentId?._id}</TableCell>
          <TableCell>{result?.studentId?.username}</TableCell>
      <TableCell>{result?.score}</TableCell>
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
