import React, { Suspense, lazy, useLayoutEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loader from "./Loader";
import firebase from "./config/fbConfig";
const LogIn = lazy(() => import("./components/logIn/LogIn"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const CourseVideos = lazy(() =>
  import("./components/course_videos/CourseVideos")
);
const UploadLecture = lazy(() =>
  import("./components/upload_lectures/UploadLecture")
);
const AmazonFBABusiness = lazy(() =>
  import("./components/lectures/amazonFBABusiness")
);
const AndroidAppsDevelopment = lazy(() =>
  import("./components/lectures/androidAppsDevelopment")
);
const ArtificialIntelligence = lazy(() =>
  import("./components/lectures/artificialIntelligence")
);
const AspWebApplications = lazy(() =>
  import("./components/lectures/aspWebApplications")
);
const AwsCloudComputing = lazy(() =>
  import("./components/lectures/awsCloudComputing")
);
const AwsDeveloperAssociate = lazy(() =>
  import("./components/lectures/awsDeveloperAssociate")
);
const AwsPractitioner = lazy(() =>
  import("./components/lectures/awsPractitioner")
);
const AwsSolutionArchitect = lazy(() =>
  import("./components/lectures/awsSolutionArchitect")
);
const BigDataAndHeadoopEcosystem = lazy(() =>
  import("./components/lectures/bigDataAndHeadoopEcosystem")
);
const BlockchainTechnology = lazy(() =>
  import("./components/lectures/blockchainTechnology")
);
const CertifiedInformationSystemAuditor = lazy(() =>
  import("./components/lectures/certifiedInformationSystemAuditor")
);
const CiscoCCNANetworking = lazy(() =>
  import("./components/lectures/ciscoCCNANetworking")
);
const CompTIAItFundamentals = lazy(() =>
  import("./components/lectures/compTIAItFundamentals")
);
const DataScience = lazy(() => import("./components/lectures/dataScience"));
const DigitalForensicCyberSecurity = lazy(() =>
  import("./components/lectures/digitalForensicCyberSecurity")
);
const Enterpreneurship = lazy(() =>
  import("./components/lectures/enterpreneurship")
);
const FullStackWebDevelopment = lazy(() =>
  import("./components/lectures/fullStackWebDevelopment")
);
const GameDevelopment = lazy(() =>
  import("./components/lectures/gameDevelopment")
);
const GoogleCloudEngineering = lazy(() =>
  import("./components/lectures/googleCloudEngineering")
);
const GraphicDesign = lazy(() => import("./components/lectures/graphicDesign"));
const InteriorDesign = lazy(() =>
  import("./components/lectures/interiorDesign")
);
const IosAppsDevelopment = lazy(() =>
  import("./components/lectures/iosAppsDevelopment")
);
const Iot = lazy(() => import("./components/lectures/iot"));
const KotlinMobileAppsDevelopment = lazy(() =>
  import("./components/lectures/kotlinMobileAppsDevelopment")
);
const MachineLeadringAndAI = lazy(() =>
  import("./components/lectures/machineLeadringAndAI")
);
const MernStack = lazy(() => import("./components/lectures/mernStack"));
const MicrosoftAzureCloudFundamentals = lazy(() =>
  import("./components/lectures/microsoftAzureCloudFundamentals")
);
const MicrosoftCloudAdministrator = lazy(() =>
  import("./components/lectures/microsoftCloudAdministrator")
);
const MicrosoftFrontEndDevelopment = lazy(() =>
  import("./components/lectures/microsoftFrontEndDevelopment")
);
const MicrosoftOfficew365 = lazy(() =>
  import("./components/lectures/microsoftOfficew365")
);
const OracleDatabaseAdministrator = lazy(() =>
  import("./components/lectures/oracleDatabaseAdministrator")
);
const PenetrationTestingCyberSecurity = lazy(() =>
  import("./components/lectures/penetrationTestingCyberSecurity")
);
const PhpLaravel = lazy(() => import("./components/lectures/phpLaravel"));
const Python = lazy(() => import("./components/lectures/python"));
const QuickbookERP = lazy(() => import("./components/lectures/quickbookERP"));
const ReactNativeWebAndAppsDevelopment = lazy(() =>
  import("./components/lectures/reactNativeWebAndAppsDevelopment")
);
const SAPERP = lazy(() => import("./components/lectures/SAPERP"));
const SearchEngineOptimization = lazy(() =>
  import("./components/lectures/searchEngineOptimization")
);
const SocialMediaMarketing = lazy(() =>
  import("./components/lectures/socialMediaMarketing")
);
const SqlServerSpecialist = lazy(() =>
  import("./components/lectures/sqlServerSpecialist")
);
const Uiux = lazy(() => import("./components/lectures/uiux"));
const VideoEditing = lazy(() => import("./components/lectures/videoEditing"));
const XamarinMobileAppsDevelopment = lazy(() =>
  import("./components/lectures/xamarinMobileAppsDevelopment")
);
const certifiedInformationSecurityManager = lazy(() =>
  import("./components/lectures/certifiedInformationSecurityManager")
);
const CompTIASecurityPlus = lazy(() =>
  import("./components/lectures/compTIASecurityPlus")
);
const CertifiedHackingForensicInvestigator = lazy(() =>
  import("./components/lectures/certifiedHackingForensicInvestigator")
);
const CisspCyberSecurityProfessional = lazy(() =>
  import("./components/lectures/cisspCyberSecurityProfessional")
);
const ProjectManagementProfessional = lazy(() =>
  import("./components/lectures/projectManagementProfessional")
);
const CertifiedEthicalHacking = lazy(() =>
  import("./components/lectures/certifiedEthicalHacking")
);
const PenetrationTestingSecurityAnalyst = lazy(() =>
  import("./components/lectures/penetrationTestingSecurityAnalyst")
);
const AwsSysOpsAdministrator = lazy(() =>
  import("./components/lectures/awsSysOpsAdministrator")
);
const DigitalMarketing = lazy(() =>
  import("./components/lectures/digitalMarketing")
);
const MayaMaxAnimation3D = lazy(() =>
  import("./components/lectures/3dMayaMaxAnimation")
);
const Autocad = lazy(() => import("./components/lectures/autocad"));

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [profile, setProfile] = useState({});

  const { replace } = useHistory();

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
        replace("/dashboard");
      }
    });
  }, [replace]);
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard
            user={loggedIn}
            setProfile={setProfile}
            profile={profile}
          />
        </Route>
        <Route path="/uploadLecture">
          <UploadLecture user={loggedIn} profile={profile} />
        </Route>
        <Route path="/courseVideos">
          <CourseVideos user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/frontEndLMS" exact>
          <MicrosoftFrontEndDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/dataScienceLMS" exact>
          <DataScience user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/aspDotNetLMS" exact>
          <AspWebApplications user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/phpLaravelLMS" exact>
          <PhpLaravel user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/mernStackLMS" exact>
          <MernStack user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/sqlServerSpecialistLMS" exact>
          <SqlServerSpecialist user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/oracleDatabaseLMS" exact>
          <OracleDatabaseAdministrator user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/androidAppLMS" exact>
          <AndroidAppsDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/iosAppLMS" exact>
          <IosAppsDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/xamarinAppLMS" exact>
          <XamarinMobileAppsDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/reactNativeLMS" exact>
          <ReactNativeWebAndAppsDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/gameDevelopmentLMS" exact>
          <GameDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/ccnaNetworkingLMS" exact>
          <CiscoCCNANetworking user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/graphicDesignLMS" exact>
          <GraphicDesign user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/videoEditingLMS" exact>
          <VideoEditing user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/seoLMS" exact>
          <SearchEngineOptimization user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/socialMediaLMS" exact>
          <SocialMediaMarketing user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/amazonFbaBusinessLMS" exact>
          <AmazonFBABusiness user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/projectManagementProfessionalLMS"
          exact
        >
          <ProjectManagementProfessional user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/digitalForensicCyberSecurityLMS"
          exact
        >
          <DigitalForensicCyberSecurity user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/penetrationTestingCyberSecurityLMS"
          exact
        >
          <PenetrationTestingCyberSecurity user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/artificialIntelligenceLMS" exact>
          <ArtificialIntelligence user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/cloudComputingLMS" exact>
          <AwsCloudComputing user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/fullStackWebDevelopmentLMS" exact>
          <FullStackWebDevelopment user={loggedIn} profile={profile} />
        </Route>

        <Route path="/lmsDashboard/myCourses/iotLMS" exact>
          <Iot user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/blockChainLMS" exact>
          <BlockchainTechnology user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/comptiaItFundamentalsLMS" exact>
          <CompTIAItFundamentals user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/kotlinMobileAppsDevelopmentLMS"
          exact
        >
          <KotlinMobileAppsDevelopment user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/comptiaSecurityPlusLMS" exact>
          <CompTIASecurityPlus user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/certifiedEthicalHackingLMS" exact>
          <CertifiedEthicalHacking user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/certifiedHackingForensicInvestigatorLMS"
          exact
        >
          <CertifiedHackingForensicInvestigator
            user={loggedIn}
            profile={profile}
          />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/penetrationTestingSecurityAnalystLMS"
          exact
        >
          <PenetrationTestingSecurityAnalyst
            user={loggedIn}
            profile={profile}
          />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/certifiedInformationSystemAuditorLMS"
          exact
        >
          <CertifiedInformationSystemAuditor
            user={loggedIn}
            profile={profile}
          />
        </Route>
        <Route path="/lmsDashboard/myCourses/awsPractitionerLMS" exact>
          <AwsPractitioner user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/awsSolutionArchitectLMS" exact>
          <AwsSolutionArchitect user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/awsSysOpsAdministratorLMS" exact>
          <AwsSysOpsAdministrator user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/awsDeveloperAssociateLMS" exact>
          <AwsDeveloperAssociate user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/microsoftAzureCloudFundamentalsLMS"
          exact
        >
          <MicrosoftAzureCloudFundamentals user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/microsoftCloudAdministratorLMS"
          exact
        >
          <MicrosoftCloudAdministrator user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/googleCloudEngineerLMS" exact>
          <GoogleCloudEngineering user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/pythonForEveryoneLMS" exact>
          <Python user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/machineLearningAndAILMS" exact>
          <MachineLeadringAndAI user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/bigDataAndHeadoopEcosystemLMS"
          exact
        >
          <BigDataAndHeadoopEcosystem user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/quickBooksERPLMS" exact>
          <QuickbookERP user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/sapERPLMS" exact>
          <SAPERP user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/digitalMarketingLMS" exact>
          <DigitalMarketing user={loggedIn} profile={profile} />
        </Route>
        <Route path=" /lmsDashboard/myCourses/uiUXDesignLMS" exact>
          <Uiux user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/interiorDesignLMS" exact>
          <InteriorDesign user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/3dMayaMaxAnimationLMS" exact>
          <MayaMaxAnimation3D user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/autocadLMS" exact>
          <Autocad user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/microsoftOffice365LMS" exact>
          <MicrosoftOfficew365 user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/enterpreneurshipLMS" exact>
          <Enterpreneurship user={loggedIn} profile={profile} />
        </Route>
        <Route
          path="/lmsDashboard/myCourses/cisspCyberSecurityProfessionalLMS"
          exact
        >
          <CisspCyberSecurityProfessional user={loggedIn} profile={profile} />
        </Route>
        <Route path="/lmsDashboard/myCourses/certifiedInformationSecurityManagerLMS">
          <certifiedInformationSecurityManager
            user={loggedIn}
            profile={profile}
          />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
