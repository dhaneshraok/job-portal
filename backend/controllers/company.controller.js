// backend/controllers/company.controller.js
import { Company } from '../models/company.model.js';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const registerCompany = async (req, res) => {
    try {
        const { companyName, userId } = req.body; // Allow userId from request body
        if (!companyName) {
            return res.status(400).json({
                message: 'Company name is required.',
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: userId || null // Use provided userId or null
        });

        return res.status(201).json({
            message: 'Company registered successfully.',
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.body.userId; // Get userId from request body
        if (!userId) {
            // Return all companies if no userId is provided
            const companies = await Company.find({});
            return res.status(200).json({
                companies,
                success: true
            });
        }
        const companies = await Company.find({ userId });
        if (!companies.length) {
            return res.status(404).json({
                message: 'No companies found for this user.',
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: 'Company not found.',
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const companyId = req.params.id;

        let company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found.'
            });
        }

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            company.logo = cloudResponse.secure_url;
            company.logoOriginalName = file.originalname;
        }

        if (name) company.name = name;
        if (description) company.description = description;
        if (website) company.website = website;
        if (location) company.location = location;

        await company.save();

        return res.status(200).json({
            message: 'Company information updated.',
            success: true,
            company
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
    }
};