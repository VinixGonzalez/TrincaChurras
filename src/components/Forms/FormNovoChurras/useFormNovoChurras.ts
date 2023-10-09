import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@/storage/Storage";
import { z } from "zod";
import { Churras, Pessoa } from "@/types";
import { normalizeValue } from "@/utils";

const NovoChurrasSchema = z.object({
  data: z.date({ required_error: "Informe a data." }),
  endereco: z
    .string({ required_error: "Informe o endereço." })
    .nonempty("Informe o endereço.")
    .max(2000, "O endereço deve ter no máximo 2000 caracteres."),
  nome: z
    .string({ required_error: "Informe o nome do evento." })
    .nonempty("Informe o nome do evento.")
    .max(200, "O nome do evento deve ter no máximo 200 caracteres."),
  observacoes: z
    .string()
    .max(4000, "A observação deve ter no máximo 4000 caracteres."),
});

type NovoChurrasSchemaType = z.infer<typeof NovoChurrasSchema>;

const VALOR_POR_PESSOA = 25;

export const useFormNovoChurras = ({
  onAddSuccess,
}: {
  onAddSuccess?: () => void;
}) => {
  const [listaPessoas, setListaPessoas] = useState<Array<Pessoa>>([]);
  const [pessoa, setPessoa] = useState("");
  const [incluirBebidasCheck, setIncluirBebidasCheck] = useState(false);
  const [valorEspecifico, setValorEspecifico] = useState("0");
  const { setChurras } = useLocalStorage();

  const valorBebidaPorPessoa = incluirBebidasCheck ? 12 : 0;

  const totalChurras = listaPessoas.reduce(
    (total, pessoa) => total + +pessoa.valor + valorBebidaPorPessoa,
    0
  );

  console.log(listaPessoas);

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors, dirtyFields, isValid, touchedFields },
    trigger,
  } = useForm<NovoChurrasSchemaType>({
    resolver: zodResolver(NovoChurrasSchema),
  });

  const id = useId();

  const handleSubmitNewChurras = (data: NovoChurrasSchemaType) => {
    if (listaPessoas.length <= 0) {
      alert("Adicione ao menos uma pessoa na lista.");
      return;
    }

    const churras: Churras = {
      ...data,
      bebidaInclusa: incluirBebidasCheck,
      lista: listaPessoas,
      total: totalChurras,
      id: Math.floor(Math.random() * 10000).toString(),
    };

    setChurras(churras);

    alert("Churras adicionado!");
    onAddSuccess && onAddSuccess();
  };

  const handleAddNovaPessoa = (nome: string) => {
    if (!nome.trim()) return;

    const valorNormalizado = normalizeValue(valorEspecifico);

    const valorPessoa =
      valorNormalizado > 0 ? valorNormalizado : VALOR_POR_PESSOA;

    setListaPessoas([
      ...listaPessoas,
      {
        nome,
        id: `${id}-${nome}-${Math.floor(Math.random() * 10000).toString()}`,
        pago: false,
        valor: valorPessoa,
      },
    ]);
    setPessoa("");
  };

  const handleRemoverPessoa = (id: string) => {
    const novaLista = listaPessoas.filter((pessoa) => pessoa.id !== id);
    setListaPessoas(novaLista);
  };

  return {
    handleRemoverPessoa,
    handleAddNovaPessoa,
    handleSubmit,
    handleSubmitNewChurras,
    register,
    setIncluirBebidasCheck,
    pessoa,
    setPessoa,
    valorEspecifico,
    setValorEspecifico,
    listaPessoas,
    totalChurras,
    errors,
    incluirBebidasCheck,
    control,
  };
};
