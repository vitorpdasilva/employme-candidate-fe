/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/auth/login": {
    /** @description Login */
    post: operations["AuthController_signIn"];
  };
  "/auth/refresh": {
    /** @description Refresh tokens */
    get: operations["AuthController_refreshToken"];
  };
  "/auth/signup": {
    /** @description Sign Up */
    post: operations["AuthController_signUp"];
  };
  "/user": {
    /** @description Register a new user */
    post: operations["UserController_create"];
  };
  "/user/{id}": {
    /** @description Update a user */
    patch: operations["UserController_update"];
  };
  "/job/list": {
    get: operations["JobController_list"];
  };
  "/job/create": {
    post: operations["JobController_create"];
  };
  "/job/{id}": {
    get: operations["JobController_getOne"];
  };
  "/job/{id}/apply": {
    post: operations["JobController_apply"];
  };
  "/skillList": {
    get: operations["SkillController_list"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    SignInDto: {
      /** @description Email */
      email: string;
      /** @description Password */
      password: string;
    };
    /** @enum {string} */
    UserType: "Candidate" | "Company";
    /** @enum {string} */
    GenderTypeDto: "Male" | "Female" | "Other";
    UserGeneralDto: {
      citizenshipCode: string;
      gender: components["schemas"]["GenderTypeDto"];
      currentLocation: string;
      phone: string;
      bio: string;
    };
    /** @enum {string} */
    ProfessionType: "Backend Engineer" | "Frontend Engineer" | "Full Stack Engineer" | "Web Developer" | "Game Developer" | "Mobile Developer" | "UI/UX Designer" | "DevOps Engineer" | "Site Reliability Engineer" | "Security Engineer" | "QA Engineer" | "Data Analyst" | "Data Scientist" | "Data Engineer" | "Machine Learning Engineer" | "Blockchain Engineer" | "Embedded Engineer" | "Mainframe Engineer" | "Hardware Engineer" | "Middleware Engineer" | "Firmware Engineer" | "Systems Administrator" | "Database Administrator" | "Network Administrator" | "Telecommunications Engineer" | "Salesforce Developer" | "Business Analyst" | "SAP Consultant" | "Software Architect" | "Scrum Master" | "Agile Coach" | "Product Manager" | "Project Manager" | "IT Manager" | "IT Director" | "Chief Technology Officer (CTO)" | "Other" | "Solutions Architect";
    /** @enum {string} */
    TechAndLanguagesAndTools: "javascript" | "html" | "sql" | "java" | "css" | "python" | "git" | "react.js" | "node.js" | "c#" | "ruby" | "angular" | "webpack" | "GoLang";
    UserSkillRankDto: {
      skill: components["schemas"]["TechAndLanguagesAndTools"];
      yearsOfExp: number;
    };
    /** @enum {string} */
    LocationType: "Hybrid" | "Remote" | "Onsite";
    UserWorkExperienceDto: {
      id: string;
      title: string;
      company: string;
      locationType: components["schemas"]["LocationType"];
      location: string;
      /** Format: date-time */
      startDate: string;
      current: boolean;
      /** Format: date-time */
      endDate: string;
      description: string;
    };
    UserProfessionalDto: {
      profession: components["schemas"]["ProfessionType"];
      yearsOfExperience: number;
      openToDiffRole: boolean;
      preferencesToWork: components["schemas"]["ProfessionType"][];
      skillsRank: components["schemas"]["UserSkillRankDto"][];
      /** @description Work Experiences */
      workExperiences: components["schemas"]["UserWorkExperienceDto"][];
    };
    /** @enum {string} */
    CurrencyType: "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD" | "BRL";
    /** @enum {string} */
    CompanySize: {"SEED":"Seed","EARLY":"Early","MID_SIZE":"Mid-size","LARGE":"Large","VERY_LARGE":"Very Large","MASSIVE":"Massive"};
    UserRecolocationDto: {
      openToRemote: string;
      relocateOptions: string;
      salaryExpected: string;
      currency: components["schemas"]["CurrencyType"];
      visa: string;
      validPassport: boolean;
      companySize: components["schemas"]["CompanySize"];
      activelyLooking: boolean;
      noticePeriod: string;
    };
    /** @enum {string} */
    JobSearchStatus: "Active" | "Open" | "Closed";
    UserPreferencesDto: {
      jobSearchStatus: components["schemas"]["JobSearchStatus"];
      salary: Record<string, never>;
      companySize: components["schemas"]["CompanySize"];
      hideFromCompanies: string[];
    };
    /** @enum {string} */
    MotivationType: "Solving Technical problems" | "Building something from scratch";
    /** @enum {string} */
    FiveYearsTrack: "Individual Contributor" | "Manager";
    /** @enum {string} */
    WorkEnvironmentType: "Clear role and set of responsibilities. Consistent feedback from management" | "Employees wear a lot of hats. Assignment often require employees to figure it out on their own";
    UserCultureDto: {
      lookingFor: string;
      motivatesMeMore: components["schemas"]["MotivationType"];
      fiveYearsCareerTrack: components["schemas"]["FiveYearsTrack"];
      workBetterIn: components["schemas"]["WorkEnvironmentType"];
    };
    UserOutputDto: {
      /** @description ID */
      id: string;
      /** @description Email */
      email: string;
      /** @description UserType */
      type: components["schemas"]["UserType"];
      /** @description Name */
      name: string;
      /** @description Access Count */
      accessCount: number;
      /** @description Username */
      username: string;
      /** @description Picture */
      picture: string;
      /** @description Jobs Applied */
      jobsApplied: string[];
      /** @description General User Info */
      general: components["schemas"]["UserGeneralDto"];
      /** @description Professional User Info */
      professional: components["schemas"]["UserProfessionalDto"];
      /** @description Relocation User Info */
      relocation: components["schemas"]["UserRecolocationDto"];
      /** @description Preferences User Info */
      preferences: components["schemas"]["UserPreferencesDto"];
      /** @description Culture User Info */
      culture: components["schemas"]["UserCultureDto"];
      /** @description Social User Info */
      social: string[];
      /** @description Education User Info */
      education: string[];
    };
    TokenOutputDto: {
      /** @description Access Token */
      accessToken: string;
      /** @description Refresh Token */
      refreshToken: string;
    };
    UserWithTokensOutputDto: {
      /** @description User's info */
      userData: components["schemas"]["UserOutputDto"];
      /** @description Tokens to login */
      tokens: components["schemas"]["TokenOutputDto"];
    };
    SignUpDto: {
      /** @description Name */
      name: string;
      /** @description Email */
      email: string;
      /** @description Password */
      password: string;
    };
    RegisterUserInputDto: {
      /** @description Email */
      email: string;
      /** @description Name */
      name: string;
      /** @description Password */
      password: string;
    };
    UpdateUserInputDto: {
      /** @description UserType */
      type?: components["schemas"]["UserType"];
      /** @description Name */
      name?: string;
      /** @description Access Count */
      accessCount?: number;
      /** @description Username */
      username?: string;
      /** @description Picture */
      picture?: string;
      /** @description Jobs Applied */
      jobsApplied?: string[];
      /** @description General User Info */
      general?: components["schemas"]["UserGeneralDto"];
      /** @description Professional User Info */
      professional?: components["schemas"]["UserProfessionalDto"];
      /** @description Relocation User Info */
      relocation?: components["schemas"]["UserRecolocationDto"];
      /** @description Preferences User Info */
      preferences?: components["schemas"]["UserPreferencesDto"];
      /** @description Culture User Info */
      culture?: components["schemas"]["UserCultureDto"];
      /** @description Social User Info */
      social?: string[];
      /** @description Education User Info */
      education?: string[];
    };
    LocationDto: {
      city: string;
      country: string;
      province: string;
    };
    SalaryDto: {
      from: number;
      to: number;
      currency: string;
      period: string;
    };
    JobDto: {
      id: string;
      title: string;
      recent: boolean;
      applicants: string[];
      /** Format: date-time */
      createdAt: string;
      description: string;
      tags: string[];
      locationType: string;
      location: components["schemas"]["LocationDto"];
      salary: components["schemas"]["SalaryDto"];
    };
    RegisterJobInputDto: {
      title: string;
      recent: boolean;
      applicants: string[];
      /** Format: date-time */
      createdAt: string;
      description: string;
      tags: string[];
      locationType: string;
      location: components["schemas"]["LocationDto"];
      salary: components["schemas"]["SalaryDto"];
    };
    SkillListOutputDto: {
      /** @description Skill List */
      skillList: string[];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** @description Login */
  AuthController_signIn: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignInDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserWithTokensOutputDto"];
        };
      };
      /** @description Email is required; Password is required */
      400: {
        content: never;
      };
      /** @description Invalid password */
      401: {
        content: never;
      };
      /** @description User not found */
      404: {
        content: never;
      };
    };
  };
  /** @description Refresh tokens */
  AuthController_refreshToken: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["TokenOutputDto"];
        };
      };
      /** @description User not authorized */
      401: {
        content: never;
      };
      /** @description User not found */
      404: {
        content: never;
      };
    };
  };
  /** @description Sign Up */
  AuthController_signUp: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SignUpDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserWithTokensOutputDto"];
        };
      };
      /** @description Email is required; Password is required; name is required */
      400: {
        content: never;
      };
      /** @description User not authorized */
      401: {
        content: never;
      };
      /** @description User already found */
      404: {
        content: never;
      };
    };
  };
  /** @description Register a new user */
  UserController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RegisterUserInputDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["UserWithTokensOutputDto"];
        };
      };
    };
  };
  /** @description Update a user */
  UserController_update: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUserInputDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["UserWithTokensOutputDto"];
        };
      };
    };
  };
  JobController_list: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["JobDto"][];
        };
      };
    };
  };
  JobController_create: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RegisterJobInputDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["JobDto"];
        };
      };
    };
  };
  JobController_getOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["JobDto"];
        };
      };
    };
  };
  JobController_apply: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["JobDto"];
        };
      };
    };
  };
  SkillController_list: {
    responses: {
      default: {
        content: {
          "application/json": components["schemas"]["SkillListOutputDto"];
        };
      };
    };
  };
}