import { DomainException } from "@shared/domain/domain.exception";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { addCategoryProductUseCase, alterStatusProductUseCase, deleteCategoryUseCase, deleteProductUseCase, insertCategoryUseCase, insertProductUseCase, recoverAllCategoriesUseCase, recoverAllProductsUseCase, recoverCategoryByIdUseCase, recoverProductByIdUseCase, recoverProductsByCategoryUseCase, removeCategoryProductUseCase, updateCategoryUseCase, updateProductUseCase } from "@modules/catalog/application/use-cases";

async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgress Connected');
        }
    )

    ////////////////
    /// Category ///
    ////////////////

    /// Recover Category By Id ///

    // console.log(await recoverCategoryByIdUseCase.execute("a22a6030-bf2f-424b-b72e-2ca49e774094"));

    /// Recover All Categories ///

    // console.log(await recoverAllCategoriesUseCase.execute());

    /// Insert Category ///

    // console.log(await insertCategoryUseCase.execute({name: 'Banho'}));

    /// Update Category ///

    // console.log(await updateCategoryUseCase.execute({
    //     id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
    //     name: "Banho"
    // }));

    /// Delele Category (Hard Delete) ///

    // console.log(await deleteCategoryUseCase.execute("f939b2ff-1167-47b6-a2f5-b59626ebf81c"));

    ///////////////
    /// Product ///
    ///////////////

    /// Variables ///

    // let category01 = await recoverCategoryByIdUseCase.execute("a22a6030-bf2f-424b-b72e-2ca49e774094");
    // let category02 = await recoverCategoryByIdUseCase.execute("1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60");

    /// Recover Product By Id ///

    // console.log(await recoverProductByIdUseCase.execute("575dbd2f-1e73-419b-9f66-b08d943b4a5a"));

    /// Recover All Product ///

    // console.log(await recoverAllProductsUseCase.execute());
    
    /// Insert Product ///

    // console.log(await insertProductUseCase.execute({name: 'Iphone', description: 'Um ótimo smartphone', value: 3000, categories: [category01]}));

    /// Update Product ///

    // console.log(await updateProductUseCase.execute({
    //     id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
    //     name: "Iphone",
    //     description: "Um ótimo smartphone",
    //     value: 3500,
    //     categories: [category01]
    // }));

    /// Delete Product (Soft Delete) ///
    
    // console.log(await deleteProductUseCase.execute("1e4f386b-d4dd-4a1d-949c-0ad29cbaf38a"));

    /// Add Category Product ///

    // console.log(await addCategoryProductUseCase.execute({
    //     id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
    //     name: "Iphone",
    //     description: "Um ótimo smartphone",
    //     value: 3500,
    //     categories: [category01]
    // }));

    /// Remove Category Product ///

    // console.log(await removeCategoryProductUseCase.execute({
    //     id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
    //     name: "Iphone",
    //     description: "Um ótimo smartphone",
    //     value: 3500,
    //     categories: [category01]
    // }));

    /// Alter Status Product ///

    // console.log(await alterStatusProductUseCase.execute({
    //     id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
    //     name: "Iphone",
    //     description: "Um ótimo smartphone",
    //     value: 3500,
    //     categories: [category01]
    // }));

    /// Recover Product By Category ///

    // console.log(await recoverProductsByCategoryUseCase.execute("06e7b01d-28d6-423f-91b4-2a21063a2a72"));


}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        if (error instanceof DomainException) {
            console.log('Domain Exception!');
            console.log(error.message);
        }
        else {
            console.log('Other Exceptions!');
            console.log(error.message);
        };
        await prisma.$disconnect();
        process.exit(1);
    });