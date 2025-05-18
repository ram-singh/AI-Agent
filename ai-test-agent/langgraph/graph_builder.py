from typing import Literal
from langgraph.graph import StateGraph, MessagesState, START, END
from agents import code_analyzer, test_generator, test_runner, test_fixer

# This code is part of the AI Test Agent project, which is designed to automate the process of generating and fixing unit tests for JavaScript applications using Jest.
#1.ExtractSourceFiles
def step1(_):
    return code_analyzer.extract_code_coverage_targets()

#2.GenerateTests
def step2(files):
    return [(f[0], test_generator.generate_unit_test(f[0], f[1])) for f in files]

#3.RunTests
def step3(_):
    out, err = test_runner.run_jest_tests()
    return test_runner.parse_failed_tests(out)

#4.FixTests")
def step4(failures):
    fixes = []
    for fail in failures:
        file = fail.split(" ").pop()
        src = open(file.replace(".spec.ts", ".ts")).read()
        test = open(file).read()
        fixes.append((file, test_fixer.fix_test_case(src, test, fail)))
    return fixes

def build_graph():
    builder = StateGraph(MessagesState)
    builder.add_node("ExtractSourceFiles", step1)
    builder.add_node("GenerateTests", step2)  
    builder.add_node("RunTests", step3)
    builder.add_node("FixTests", step4)  

    builder.add_edge(START, "ExtractSourceFiles")
    builder.add_edge("ExtractSourceFiles", "GenerateTests")
    builder.add_edge("GenerateTests", "RunTests")
    builder.add_edge("RunTests", "FixTests")
    builder.add_edge("FixTests", END)   

    #builder.add_conditional_edges("RunTests", "FixTests", condition=lambda x: x != [], label="If tests fail")
    #builder.add_conditional_edges("RunTests", END, condition=lambda x: x == [], label="If tests pass")   
    #builder.add_conditional_edges("GenerateTests", END, condition=lambda x: x == [], label="If no files to test")
    #builder.add_conditional_edges("ExtractSourceFiles", END, condition=lambda x: x == [], label="If no files to test")   
    #builder.add_conditional_edges("ExtractSourceFiles", "GenerateTests", condition=lambda x: x != [], label="If files to test")
    #builder.add_conditional_edges("GenerateTests", "RunTests", condition=lambda x: x != [], label="If tests generated")
    #builder.add_conditional_edges("RunTests", "FixTests", condition=lambda x: x != [], label="If tests failed")
    #builder.add_conditional_edges("FixTests", END, condition=lambda x: x == [], label="If tests fixed")
    #builder.add_conditional_edges("FixTests", "RunTests", condition=lambda x: x != [], label="If tests not fixed")
    #builder.add_conditional_edges("FixTests", "GenerateTests", condition=lambda x: x != [], label="If tests not fixed")  

    return builder
