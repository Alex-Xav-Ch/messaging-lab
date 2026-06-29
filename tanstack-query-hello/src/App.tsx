import { useQuery } from "@tanstack/react-query";

function fetchHelloWorld(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hola Mundo desde TanStack Query");
    }, 1000);
  });
}

export default function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello-world"],
    queryFn: fetchHelloWorld,
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return <h1>Ocurrió un error</h1>;
  }

  return (
    <main>
      <h1>{data}</h1>
    </main>
  );
}
