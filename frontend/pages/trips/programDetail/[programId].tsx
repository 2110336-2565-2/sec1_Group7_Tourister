import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProgramDetail from '@/components/program/ProgramDetail';
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { getProgramById } from "@/services/programService";


export default function ProgramDetailPage() {
  const router = useRouter();
  const { programId } = router.query;

  const [program, setProgram] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgramDetailData = async () => {
      setLoading(true);
      try {
        const response = await getProgramById(programId as string);
        const program = response.data || {};
        setProgram(program);
      } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
      }
    };

    if (programId) {
      fetchProgramDetailData();
    }
  }, [programId]);

  return (
    <AuthProvider role="guide">
      <>
        <NavBar />
        {loading ? (
          <div>Loading...</div>
        ) : program ? (
          <ProgramDetail
            program={program}
            onGoBack={() => router.back()}
          />
        ) : (
          <div>No program found</div>
        )}
      </>
    </AuthProvider>
  );
}
