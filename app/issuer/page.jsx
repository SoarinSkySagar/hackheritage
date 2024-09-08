"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, FileText, LogOut, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "react-hot-toast";
import Navigation from "@/components/Navigation";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const cardVariants = {
  initial: { scale: 0.9, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

const Head = ({ user }) => (
  <header className="bg-white shadow-sm mb-8">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {user}</h1>
          <p className="mt-1 text-sm text-gray-600">
            You can see your DecentralDocs issued documents here!
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex items-center">
            <User className="mr-2 h-4 w-4" /> My Profile
          </Button>
          <Button variant="destructive" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  </header>
);

const DocumentArray = ({ documents }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Your Issued Documents</h2>
      <Link href="/issuer/issued" passHref>
        <Button variant="link" className="text-blue-600">View All</Button>
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <motion.div key={doc.id} variants={cardVariants} whileHover="hover">
          <Card>
            <CardContent className="pt-6">
              <Image
                src="/sample.webp"
                alt={doc.title}
                width={200}
                height={100}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.subtitle}</CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function IssuerPage() {
  const [auth] = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (auth) {
      router.push("/404");
    } else {
      // Simulate fetching user data
      setUser("Sagar Rana");
      
      // Simulate fetching documents
      const fakeDocuments = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Document ${i + 1}`,
        subtitle: `Subtitle for Document ${i + 1}`,
        image: "/sample.webp",
      }));
      setDocuments(fakeDocuments);
    }
  }, [auth, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navigation /> */}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <Head user={user} />
        <main>
          <DocumentArray documents={documents} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <Button className="flex items-center" size="lg">
              <Plus className="mr-2 h-5 w-5" /> Issue New Document
            </Button>
          </div>
        </main>
      </motion.div>
      <Toaster position="bottom-center" />
    </div>
  );
}