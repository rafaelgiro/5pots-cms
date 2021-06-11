export function handleErrorConsole(error: {
  response: { data: { status: number; message: string } };
}) {
  const { status, message } = error.response.data;
  console.log(`Erro ${status}: ${message}`);
}
