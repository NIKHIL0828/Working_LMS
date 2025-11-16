import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DollarSign, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

const InstructorDashboard = ({ listOfCourses }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    studentList: [],
  });

  const [loading, setLoading] = useState(true);

  const calculateTotalStudentsAndRevenue = () => {
    const { totalStudents, totalRevenue, studentList } = listOfCourses.reduce(
      (acc, course) => {
        acc.totalStudents += course?.studentsEnrolled?.length || 0;
        acc.totalRevenue += course?.studentsEnrolled?.length * course?.coursePrice || 0;

        course?.studentsEnrolled?.forEach((s) => {
          acc.studentList.push({
            studentName: s?.studentName,
            studentEmail: s?.studentEmail,
          });
        });

        return acc;
      },
      {
        totalStudents: 0,
        totalRevenue: 0,
        studentList: [],
      }
    );

    setStats({ totalStudents, totalRevenue, studentList });
    setLoading(false);
  };

  useEffect(() => {
    if (listOfCourses?.length) {
      calculateTotalStudentsAndRevenue();
    }
  }, [listOfCourses]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full col-span-1 md:col-span-2" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* ===== STATS CARDS SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Total Students */}
        <Card className="bg-white/70 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl transition hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Total Students
            </CardTitle>
            <Users className="w-8 h-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="bg-white/70 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl transition hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-8 h-8 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">₹ {stats.totalRevenue}</p>
          </CardContent>
        </Card>

      </div>

      {/* ===== RECENT STUDENTS TABLE ===== */}
      <Card className="bg-white/70 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Recent Students
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600 font-medium">Name</TableHead>
                  <TableHead className="text-gray-600 font-medium">Email</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {stats.studentList.map((student, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100/60 transition cursor-pointer"
                  >
                    <TableCell className="font-medium text-gray-800">
                      {student?.studentName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {student?.studentEmail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default InstructorDashboard;
