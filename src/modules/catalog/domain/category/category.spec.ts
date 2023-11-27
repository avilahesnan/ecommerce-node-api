import { faker } from '@faker-js/faker';
import { IDEntityUUIDInvalid } from '@shared/domain/domain.exception';
import { beforeAll, describe, expect, test } from "vitest";
import { Category } from './category.entity';
import { CreateCategoryProps, RecoverCategoryProps } from './category.types';
import { NameCategorySizeMaximumInvalid, NameCategorySizeMinimumInvalid } from './category.exception';

let nameCategoryValid: string;
let nameCategorySizeMaximumInvalid: string;
let nameCategorySizeMinimumInvalid: string;
let UUIDValid: string;
let UUIDInvalid: string;

describe('Domain Entity: Category', () => {

    beforeAll(async () => {

        nameCategoryValid = faker.string.alpha({ length: { min: Category.SIZE_MINIMUM_NAME, max: Category.SIZE_MAXIMUM_NAME } });
        nameCategorySizeMinimumInvalid = faker.string.alpha({ length: { min: Category.SIZE_MINIMUM_NAME-1, max: Category.SIZE_MINIMUM_NAME-1 } });
        nameCategorySizeMaximumInvalid = faker.string.alpha({ length: { min: Category.SIZE_MAXIMUM_NAME+1, max: Category.SIZE_MAXIMUM_NAME+1 } });
        UUIDValid = faker.string.uuid();
        UUIDInvalid = faker.string.alpha({ length: { min: 1, max: 20 } });
        
    })

    describe('Category (create)', () => {

        test('Should Create A Valid Category - ', async () => {

            const categoryValid: CreateCategoryProps = {
                name: nameCategoryValid
            };

            expect(Category.create(categoryValid))
                .to.be.instanceOf(Category);
        });
    
        test('Should Not Create Category With Invalid Name - Minimum Size', () => {

            const categoryInvalid: CreateCategoryProps = {
                name: nameCategorySizeMinimumInvalid
            };

            expect(() => Category.create(categoryInvalid))
                .toThrowError(NameCategorySizeMinimumInvalid);
        });
    
        test('Should Not Create Category With Invalid Name - Maximum Size', () => {

            const categoryInvalid: CreateCategoryProps = {
                name: nameCategorySizeMaximumInvalid
            };

            expect(() => Category.create(categoryInvalid))
                .toThrowError(NameCategorySizeMaximumInvalid);
        });
    });
    
    describe('Category (Recover)', () => {
    
        test('Should Recover A Valid Category', async () => {
    
            const categoryValid: RecoverCategoryProps = {
                id: UUIDValid,
                name: nameCategoryValid
            };
    
            expect(Category.recover(categoryValid))
                .to.be.instanceof(Category);   
        });
    
        test('Should Not Recover Category With Invalid ID - Invalid UUID', async () => {
    
            const categoryIdInvalid: RecoverCategoryProps = {
                id: UUIDInvalid,
                name: nameCategoryValid
            };
    
            expect(() => Category.recover(categoryIdInvalid))
                .toThrowError(IDEntityUUIDInvalid);
        });
    
        test('Should Not Recover Category With Invalid Name - Minimum Size', async () => {
    
            const categoryNameInvalid: RecoverCategoryProps = {
                id: UUIDValid,
                name: nameCategorySizeMinimumInvalid
            };
    
            expect(() => Category.recover(categoryNameInvalid))
                .toThrowError(NameCategorySizeMinimumInvalid);
        });
    
        test('Should Not Recover Category With Invalid Name - Maximum Size', async () => {
    
            const categoryNameInvalid: RecoverCategoryProps = {
                id: UUIDValid,
                name: nameCategorySizeMaximumInvalid
            };
    
            expect(() => Category.recover(categoryNameInvalid))
                .toThrowError(NameCategorySizeMaximumInvalid);
        });
    });
});