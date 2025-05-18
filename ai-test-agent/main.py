from langgraph.graph import Graph
from langgraph.graph_builder import build_graph
def main():
    # Build the graph and invoke it
    graph:Graph = build_graph()
    graph.compile()

main()