# Sequelize

## Getting started

- Iniciar o sequelize:

  ```bash
  yarn sequelize-cli init
  ```

- **Criação e população da tabela People**

  - Criação da model:

    ```bash
    yarn sequelize-cli model:create --name Person --attributes name:string,active:boolean,email:string,role:string
    ```

  - Execução da migration:

    ```bash
    yarn sequelize-cli db:migrate
    ```

  - Geração da seed:

    ```bash
    yarn sequelize-cli seed:generate --name demo-Person
    ```

  - Execução das seeds:

    ```bash
    yarn sequelize-cli db:seed:all
    ```

- **Alterações em tables com migrations**

  - Criação da migration:

  ```bash
    yarn sequelize-cli migration:create --name add-column-person
  ```
