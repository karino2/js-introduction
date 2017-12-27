import math
def assertEquals(expect, actual, epsilon=1e-3):
    success = True
    if type(expect) == int and type(actual) == int:
        success = (expect == actual)
    else:
        success = math.isclose(expect, actual, rel_tol=epsilon)
    if not success:
        print("FAILED!!! expect ({}), but actual ({})".format(expect, actual))


