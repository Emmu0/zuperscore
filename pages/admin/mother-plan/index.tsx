// React Imports
import { useState, useEffect } from "react";
// Next Imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// SEO
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// UI Components
import Button from "@components/buttons";
import { PlusIcon } from "@heroicons/react/solid";
// Mother Plan Components
import PlanCard from "@components/admin/mother-plan/PlanCard";
import CreatePlan from "@components/admin/mother-plan/CreatePlan";
import { plans } from "../../../data/mother-plan";
import Timer from "@components/Timer";

const seoMetaInformation = {
  title: "Mother Plan",
};

const MotherPlan: NextPage = () => {
  const router = useRouter();
  const { plan_id } = router.query;

  useEffect(() => {
    if (!plan_id) router.push(`/admin/mother-plan?plan_id=${plans[0].id}`);
  }, [plan_id, plans, router]);

  // Set current plan
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  useEffect(() => {
    if (plan_id && plans && plans.length > 0) {
      if (!currentPlan || (currentPlan && currentPlan?.id != plan_id))
        setCurrentPlan(() => plans.find((_plan: any) => _plan.id == plan_id));
    }
  }, [plan_id, currentPlan, plans]);

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="text-2xl font-medium pb-1">Mother Plan</div>
            <Timer seconds={10} callback={() => {}} />
            <div>
              <CreatePlan>
                <Button size="sm" className="flex items-center gap-2">
                  <PlusIcon width="14" height="14" fill="#F3E4B1" /> Add New Plan
                </Button>
              </CreatePlan>
            </div>
          </div>
          {/* Plan List */}
          {plans && plans.length > 0 ? (
            <>
              <div className="mt-5 overflow-x-scroll pb-5">
                <div className="flex items-center gap-2">
                  {plans.map((plan: any, planIndex: number) => {
                    return (
                      <div
                        key={`plan-${planIndex}`}
                        className={`border-2 border-violet-100 text-violet-100 duration-300 rounded py-1 px-3 text-sm ${
                          plan.id == plan_id
                            ? "bg-violet-100 text-yellow-0"
                            : "hover:bg-violet-100 hover:text-yellow-0"
                        } whitespace-nowrap`}
                      >
                        <Link href={`/admin/mother-plan?plan_id=${plan.id}`}>
                          <a>{plan.name}</a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Selected Plan */}
              <div className="mt-5">
                <PlanCard planId={plan_id} />
              </div>
            </>
          ) : (
            <h3 className="text-center mt-5">No Plans available.</h3>
          )}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(MotherPlan, { authRequired: true });
