import React, { useEffect, useState } from "react";
import AssignmentForm from "../components/AssignmentForm";
import PagesLayout from "../layouts/PagesLayout";
import useUserStore from "../store/user-store";
import { useParams } from "react-router-dom";
import assignmentService from "../services/assignment.service";
 import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Calendar } from "lucide-react";
import AssignmentAnswerForm from "../components/AssignmentAnswersForm";
import userService from "../services/user.service";

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

  return (
    <PagesLayout>
      <main className="container mx-auto py-6 ">
        {/* answers */}
       <Table>
  <TableCaption>Results List</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Student Name</TableHead>
      <TableHead>Student Id</TableHead>
      <TableHead>Marks</TableHead>
     </TableRow>
  </TableHeader>
  <TableBody>
    {assignment && assignment.length > 0 && assignment?.map(result => (
    <TableRow key={result?._id}>
      <TableCell>{result?.assignmentId?.title}</TableCell>
      <TableCell>{result?.studentId?.username}</TableCell>
      <TableCell>{result?.score}</TableCell>
     </TableRow>
    ))}
    
  </TableBody>
</Table>
      </main>
    </PagesLayout>
  );
}
