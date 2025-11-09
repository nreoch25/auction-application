import { getSession } from "../actions/authActions";
import Heading from "../components/extra/Heading";
import AuthTest from "./AuthTest";

export default async function SessionPage() {
  const session = await getSession();
  return (
    <div>
      <Heading title="Session" subtitle="Session data" />
      <div className="bg-blue-200 border-2 border-blue-500">
        <h3 className="text-lg">Session data</h3>
        <pre className="whitespace-pre-wrap break-all p-3">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <AuthTest />
      </div>
    </div>
  );
}
