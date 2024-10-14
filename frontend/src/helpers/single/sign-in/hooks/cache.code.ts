const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data: ILoginData = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    const validationResult = SCH_login.safeParse(data);

    if (validationResult.success) {
      setErrors({
        email: { isWrong: false, message: "" },
        password: { isWrong: false, message: "" },
      });

      setIsLoading(true);

      try {
        const result = await signIn("credentials", {
          username: data.email,
          password: data.password,
          callbackUrl: "/welcome",
          redirect: false
        });

        if (result?.error) {
          if (result.error === "CredentialsSignin") {
            return toast({
              variant: "destructive",
              title: "Credenciais invalidas",
              description: "Verifique suas credenciais e volte a tentar."
            });
          }

          return toast({
            variant: "destructive",
            title: "Erro ao fazer login",
            description: "Tente novamente ou volte mais tarde."
          });
        }

        toast({
          title: `Seja bem vindo, ${(await getSession()).user.name.split(" ")[0]}`,
          description: "Login feito com sucesso!",
          style: { backgroundColor: "#ffffff" },
          duration: 3000
        });
        
        setTimeout(() => { router.push("/welcome") }, 3000)
      } catch {
        toast({
          variant: "destructive",
          title: "Sem conexao",
          description: "Verifique sua internet e volte a tentar."
        });

        setErrors({
          email: { isWrong: false, message: "" },
          password: { isWrong: false, message: "" },
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      const newErrors = {
        email: { isWrong: false, message: "" },
        password: { isWrong: false, message: "" },
      };

      validationResult.error.errors.forEach(err => {
        if (err.path[0] === 'email') {
          newErrors.email = { isWrong: true, message: err.message };
        } else if (err.path[0] === 'password') {
          newErrors.password = { isWrong: true, message: err.message };
        }
      });

      setErrors(newErrors);
    }
  };